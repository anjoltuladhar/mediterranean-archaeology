import React from "react";
import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
import { makeStyles } from "@material-ui/core/styles"
import { Slide } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        position: "relative"
    },
    imgcontainer: {
        position: "relative",
        height: 300,
        overflow: "hidden"
    },
    imgArea: {
        position: "absolute",
        height: "100%",
        width: "100%"
    },
    img: {
        height: "100%",
        display: "block",
        margin: "0 auto"
    }
})

function imageTags(images){
    let elements = [];
    for (let i = 0; i < images.length; i++) {
        elements[i] = images[i];
    }
    return elements;
}

export default function MySlider(props){
    const { images } = props;
    const classes = useStyles()
    const image_structure = imageTags(images)
    return(
        <div className={classes.root}>
            <div className={classes.imgcontainer}>
                <AutoRotatingCarousel
                    label='Get started'
                    style={{ position: 'absolute' }}
                >
                {
                image_structure.map(function(image) {
                    return(
                        <Slide
                            media={<img src={"./images/" + image} alt="No images" />}
                            title='This is a very cool feature'
                            subtitle='Just using this will blow your mind.'
                            key={image}
                        />
                    )
                })}
                </AutoRotatingCarousel>
            </div>
            
        </div>
    );
}