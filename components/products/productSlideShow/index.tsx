import { FC } from 'react';
import { Slide } from 'react-slideshow-image';
import style from './styles.module.css';
import "react-slideshow-image/dist/styles.css";
interface Props {
    images: string[]
}

export const ProductSlideShow:FC<Props> = ({images}) => {
  return (
    <Slide
        easing='ease'
        duration={7000}
        indicators

    >
        {
            images.map(image => {
                const url = `/products/${image}`
                return (
                    <div className={style['each-slide']} key={image}>
                        <div style={{
                            backgroundImage: `url(${url})`,
                            backgroundSize: 'cover'
                        }}>

                        </div>
                    </div>
                )
            })
        }
    </Slide>
  )
}
