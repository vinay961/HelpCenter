import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
    {
        id: 1,
        name: 'Shikhar Singh, Aaganbadi',
        text: 'This is an amazing platform! Highly recommend to everyone.',
    },
    {
        id: 2,
        name: 'Kshtij Sharma, Primary School',
        text: 'A wonderful experience from start to finish. Easy to use.',
    },
    {
        id: 3,
        name: 'Shiv Verma,CSJMU',
        text: 'Great service and support. I found the perfect room in no time!',
    },
    {
        id: 4,
        name: 'Akash Saroj,AITH',
        text: 'Great service and support. I found the perfect room in no time!',
    },
];

const Testimonial = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 768, // Adjust breakpoint as needed
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="w-full max-w-lg mx-auto my-12 shadow-lg">
            <hr className="border-t-2 border-gray-300 mb-6" />
            <h3 className="text-3xl text-center mb-6 text-gray-500">Customer Reviews</h3>
            <Slider {...settings} className="mx-auto">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transform transition-transform duration-300 hover:scale-105">
                        <p className="text-gray-700 mb-4">{testimonial.text}</p>
                        <p className="text-gray-900 font-bold">{testimonial.name}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Testimonial;
