package com.eazybytes.eazystore.service.impl;

import com.eazybytes.eazystore.constants.ApplicationConstants;

import com.eazybytes.eazystore.dto.OrderItemResponseDto;
import com.eazybytes.eazystore.dto.OrderRequestDto;
import com.eazybytes.eazystore.dto.OrderResponseDto;
import com.eazybytes.eazystore.entity.Customer;
import com.eazybytes.eazystore.entity.Order;
import com.eazybytes.eazystore.entity.OrderItem;
import com.eazybytes.eazystore.entity.Product;
import com.eazybytes.eazystore.exception.ResourceNotFoundException;
import com.eazybytes.eazystore.repository.OrderRepository;
import com.eazybytes.eazystore.repository.ProductRepository;
import com.eazybytes.eazystore.service.IOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements IOrderService {

    private final OrderRepository orderRepo;
    private final ProductRepository productRepo;
    private final ProfileServiceImpl profileSvc;

    @Override
    public void createOrder(OrderRequestDto request) {
        Customer customer = profileSvc.getAuthCustomer();

        Order order = new Order();
        order.setCustomer(customer);
        BeanUtils.copyProperties(request, order);
        order.setOrderStatus(ApplicationConstants.ORDER_STATUS_CREATED);

        List<OrderItem> orderItems = request.items().stream().map(item -> {
            OrderItem orderItem = new OrderItem();
            Product product = productRepo.findById(item.productId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product", "ProductId", item.productId().toString()));
            orderItem.setProduct(product);
            orderItem.setQuantity(item.quantity());
            orderItem.setOrder(order);
            orderItem.setPrice(item.price());
            return orderItem;
        }).toList();

        order.setOrderItems(orderItems);
        orderRepo.save(order);
    }

    @Override
    public List<OrderResponseDto> getCustomerOrders() {
        Customer customer = profileSvc.getAuthCustomer();

        List<Order> orders = orderRepo.findByCustomerOrderByCreatedAtDesc(customer);
        return orders.stream().map(this::mapToOrderResponseDto).toList();
    }

    @Override
    public List<OrderResponseDto> getAllPendingOrders() {
        List<Order> orders = orderRepo.findByOrderStatus(ApplicationConstants.ORDER_STATUS_CREATED);

        return orders.stream().map(this::mapToOrderResponseDto).toList();
    }

    @Override
    public Order updateOrderStatus(Long orderId, String orderStatus) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "OrderID", orderId.toString()));

        order.setOrderStatus(orderStatus);
        return orderRepo.save(order);
    }

    private OrderResponseDto mapToOrderResponseDto(Order order) {
        List<OrderItemResponseDto> orderItems = order.getOrderItems()
                .stream().map(this::mapToOrderItemResponseDto)
                .toList();

        return new OrderResponseDto(order.getOrderId(), order.getOrderStatus(),
                order.getTotalPrice(), order.getCreatedAt().toString(), orderItems);
    }

    private OrderItemResponseDto mapToOrderItemResponseDto(OrderItem orderItem) {
        return new OrderItemResponseDto(orderItem.getProduct().getName(), orderItem.getQuantity(),
                orderItem.getPrice(), orderItem.getProduct().getImageUrl());
    }
}
