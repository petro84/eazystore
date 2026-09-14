package com.eazybytes.eazystore.service.impl;

import com.eazybytes.eazystore.constants.ApplicationConstants;
import com.eazybytes.eazystore.dto.OrderRequestDto;
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
}
