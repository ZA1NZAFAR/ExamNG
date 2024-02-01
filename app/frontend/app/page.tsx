import {Button} from "@nextui-org/react";
import React from "react";
import style from './style_home.module.css';
import Footer from "@/components/footer";

export default function Home() {
    return (
        <div>
            <h1 className={style.title_black}>
                Online Exams Made Easy, Success Breezy !
            </h1>
            <img className={style.image_stroke} src={'./stroke_line.svg'} alt={'stroke line'}/>

            <p className={style.text}>
                Experience the future of exams: Take your assessments online, free from the constraints of physical
                testing centers.
            </p>
            <p className={style.text}>
                Ready ?
            </p>
            <img className={style.image_lines} src={'./3_lines.svg'} alt={'three line'}/>
            <Button className={style.button}>Join us !</Button>
            <img className={style.image_prof} src={'./prof.svg'} alt={'prof'}/>
            <img className={style.image} src={'./desk_region.svg'} alt={'desk region'}/>
            <img className={style.image_girl} src={'./home_girl.svg'} alt={'home girl'}/>
            <Footer></Footer>
        </div>

    );

}
