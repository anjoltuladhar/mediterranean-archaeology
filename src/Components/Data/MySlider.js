import React from "react";
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
    root: {
        position: "relative"
    },
    imgcontainer: {
        position: "relative",
        height: 250,
        overflow: "hidden"
    },
    imgArea: {
        position: "absolute",
        height: "100%",
        width: "100%",
        top: 0,
        '& img': {
            height: "100%",
            display: "block",
            visibility: "hidden",
            margin: "0 auto",
            opacity: 0,
            transition: "0.3s visibility, 0.3s opacity"
        },
        '&.show img': {
            visibility: "visible",
            opacity: 1,
            transition: "0.3s visibility, 0.3s opacity"
        }
    },
    counter: {
        position: "absolute",
        bottom: 0,
        right: 30,
        display: "inline-block",
        padding: "5px 20px",
        background: "#b2d4f3",
        color: "#fff",
        textShadow: "2px 2px 10px rgba(0,0,0,0.4)",
        borderRadius: 10
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

    let i = 1;
    var interval = setInterval(function(){
        var element = document.getElementById('image-slider');
        if(element === null){
            console.log("cleared");
            clearInterval(interval);
        }
        else{
            var size = element.childNodes.length;
            if(size > 0){
                var counter = document.getElementById("madd-counter");
                if(i < size){
                    if(i === 0){
                        element.childNodes[size - 1].classList.remove("show");
                    }
                    else if(i > 0){
                        element.childNodes[i - 1].classList.remove("show");
                    }
                    element.childNodes[i].classList.add("show");
                    counter.childNodes[0].innerHTML = (i + 1) + "/" + size;
                    i++;
                }
                if(i >= size){
                    i = 0;
                }
            }
            else{
                var node = document.createElement("img");
                node.setAttribute('src','./images/noimage.png');
                node.setAttribute('alt','no image');
                node.setAttribute('style', "height: 100%; margin: 0 auto; display: block;");
                element.appendChild(node);
                clearInterval(interval);
            }
        }
    },2000);

    let display = true;
    const intialShow = () => {
        if(display){
            display = false;
            return " show";
        }
        return "";
    }

    return(
        <div className={classes.root}>
            <div className={classes.imgcontainer} id="image-slider">
                {
                image_structure.map(function(image) {
                    return(
                        <div className={classes.imgArea + intialShow()} key={image}>
                            <img src={"./images/" + image} className={classes.img} alt="No images" />
                        </div>
                    )
                })}
            </div>
            <div className={classes.counter} id="madd-counter">
                <span>{((image_structure.length > 0)?"1":"0") + "/" + image_structure.length}</span>
            </div>
        </div>
    );
}