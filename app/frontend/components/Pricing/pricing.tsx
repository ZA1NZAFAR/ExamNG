"use client";
import * as React from 'react';
import { Button, Card, CardBody } from "@nextui-org/react";
import style from "./style_pricing.module.css";
import { Switch } from "@nextui-org/react";
import {ChangeEvent, useEffect, useState} from "react";

export default function Pricing() {
    const check_point_url = "/check-circle.svg";
    const check_point_white_url = "/check-circle-white.svg";
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Remove event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    // Determine whether to show cards in a row or column
    const isHorizontalLayout = windowWidth <= 750;

    const Price_list = [
        {
            price: "$0",
            price2: "$0",
            time: " /month",
            time2: " /year",
            title: "Starter",
            sub_text: "Unleash the power of online exams.",
            bullet_points: ["Multi-users", "10 courses", "number of students < 300"]
        },
        {
            price: "$54",
            price2: "$648",
            time: " /month",
            time2: " /year",
            title: "Professional",
            sub_text: "Advanced tools to take your work to the next level.",
            bullet_points: ["Multi-users", "Unlimited courses", "number of students < 600", "Shared Workspace"]
        },
        {
            price: "$89",
            price2: "$1068",
            time: " /month",
            time2: " /year",
            title: "Academy",
            sub_text: "Automation plus enterprise-grade features.",
            bullet_points: ["Multi-users", "Unlimited courses", "Unlimited students number", "Advanced Admin", "Custom Data Retention"]
        },
    ];

    // State to manage the selected state of the switch
    const [isYearlySelected, setIsYearlySelected] = React.useState(false);

    // Specify the correct type for the event (HTMLInputElement)
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsYearlySelected(event.target.checked);
    };

    return (
        <>
            <h1 className={style.Title}>Plans & Pricing</h1>
            <h2 className={style.subTitle}>Whether your academy needs are large or small, we’re here to help you scale.</h2>
            <div className={`w-full ${style.globalCards} mx-auto sm:flex-col md:flex-col lg:flex-row relative`}>
                <div className={style.customSwitchLg}>
                    <Switch
                        defaultSelected={false}
                        size="lg"
                        color="success"
                        startContent={<p>M</p>}
                        endContent={<p>Y</p>}
                        onChange={handleChange}
                    />
                </div>
                <div className={style.ladyImage}>
                    <img src="/Lady_with_pencil.svg" alt="Lady"/>
                </div>
                <div className={style.blobText}>
                    <img src="/BlobText.png" alt="text"/>
                </div>


                <Card className={style.pricing}>
                    <CardBody>
                        <div className={`gap-2 grid ${isHorizontalLayout ? 'grid-cols-1' : 'sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'} ${style.global}`}>
                            {Price_list.map((item, index) => (
                                <Card
                                    shadow={index === Price_list.length - 1 ? 'lg' : 'sm'}
                                    key={index}
                                    isPressable
                                    onPress={() => console.log('item pressed')}
                                    className={`${index === Price_list.length - 1 ? `${style.lastCard}` : ''}`}
                                >
                                    <CardBody className="p-4">
                                        {index === Price_list.length - 1 && (
                                            <img src="/Most_Popular.svg" alt="most popular" className={style.MostPopularImage} />
                                        )}
                                        <div>
                                            <h1 className={index === Price_list.length - 1 ? style.lastPrice : style.price}>{isYearlySelected ? item.price : item.price2}</h1>
                                            <h1 className={index === Price_list.length - 1 ? style.lastTime : style.time}>{isYearlySelected ? item.time : item.time2}</h1>
                                        </div>
                                        <h1 className={index === Price_list.length - 1 ? style.lastTitle : style.title}>{item.title}</h1>
                                        <p className={index === Price_list.length - 1 ? style.lastSubText : style.subtext}>{item.sub_text}</p>
                                        <ul className={style.bulletPoints}>
                                            {item.bullet_points.map((point, idx) => (
                                                <li key={idx} className={index === Price_list.length - 1 ? style.lastBulletPointItem : style.bulletPointItem}>
                                                    <img src={index === Price_list.length - 1 ? check_point_white_url : check_point_url} alt="check_circle" className={style.checkCircle} />
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardBody>
                                    <Button className={index === Price_list.length - 1 ? style.lastButton : style.button}>Choose plan</Button>
                                </Card>
                            ))}
                        </div>
                    </CardBody>
                </Card>



            </div>
        </>
    );
}
