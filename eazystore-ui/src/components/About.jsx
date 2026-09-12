import PageTitle from './PageTitle';

export default function About() {
    const h3Style = "text-lg font-semibold text-primary dark:text-light mb-2";
    const pStyle = "text-gray-600 dark:text-lighter";

    return (
        <div className="max-w-6xl min-h-213 mx-auto px-6 py-8 font-primary">
            <PageTitle title="About Us" />

            <p className="leading-6 mb-8 text-gray-600 dark:text-lighter">
                <span className="text-lg font-semibold text-primary dark:text-light">
                    eazy sticker
                </span>{" "}
                store is an initiative by{" "}
                <span className="text-lg font-semibold text-primary dark:text-light">
                    Designs by eazybytes
                </span>
                , dedicated to offering you the most sought-after stickers and posters!
            </p>
            <h2 className="text-2xl leading-8 font-bold text-primary dark:text-light mb-6">
                Why Choose Us?
            </h2>
            <div className="space-y-8">
                <div>
                    <h3 className={h3Style}>Premium Quality</h3>
                    <p className={pStyle}>
                        We strive to provide every customer with the utmost satisfaction by 
                        delivering high-quality vinyl stickers crafted with care and precision.
                    </p>
                </div>
                <div>
                    <h3 className={h3Style}>Product Innovation</h3>
                    <p className={pStyle}>
                        Our vinyl stickers feature a premium matte or glossy finish
                        lamination and are made with advanced adhesive technology. Designed
                        to withstand all weather conditions and resist scratches, our
                        stickers are gentle enough to preserve the surface of your beloved
                        gadgets.
                    </p>
                </div>
                <div>
                    <h3 className={h3Style}>Excellent Service</h3>
                    <p className={pStyle}>
                        Customer satisfaction is our top priority, and we're committed
                        to delivering an exceptional shopping experience.
                        
                    </p>
                </div>
                <div>
                    <h3 className={h3Style}>Designs You'll Love</h3>
                    <p className={pStyle}>
                        With over 1,000 designs, our collection ranges from relatable and
                        seriously funny to delightfully quirky. And we're just getting
                        started-stay tuned for more exciting products and designs!
                    </p>
                </div>
            </div>
        </div>
    )
}