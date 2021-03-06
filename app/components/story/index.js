import React, { useState, useRef, useEffect } from 'react'
import { View } from 'react-native'
import { Colors, CommonStyles, containerPadding, wide } from "../../constants"
import Carousel from 'react-native-snap-carousel';
import { postComments } from '../../constants/dummy';
import { ParallaxItem } from '../../containers/stories/parallaxStory';
import { Label } from '../common/label';
let offset = wide - (containerPadding * 2)
var pause = false;
var timer = null
const CarouselContainer = ({ data, user, Close, onChange, onNext, onPrev, onMore, options }) => {
    const carouselref = useRef(null)
    const [progress, onProgress] = useState(0)
    const [endlistener, onEnd] = useState(false)
    const [complete, onComplete] = useState(false)
    // useEffect(() => {
    //     let progress = 0;
    //     timer = setInterval(() => {
    //         if (!pause) {
    //             progress += 0.01;
    //             if (progress > 1) {
    //                 progress = 1;
    //                 onEnd(true)
    //             }
    //             else {
    //                 onComplete(false)
    //             }
    //             onProgress(progress)
    //         }
    //     }, 50);
    //     return () => clearInterval(timer);
    // }, [complete]);

    useEffect(() => {
        carouselref.current.snapToItem(user)
        resetTimeData()
        onComplete(!complete)
    }, [user])

    useEffect(() => {
        pause = options ? true : false
    }, [options])

    const resetTimeData = () => {
        clearInterval(timer);
        onProgress(0);
        onComplete(true)
        onEnd(false)
    }

    return <>
        <View style={styles.subcont}>
            <Carousel
                data={data}
                ref={carouselref}
                removeClippedSubviews={false}
                renderItem={({ item, index }) => <ParallaxItem
                    onClose={() => { Close(), clearInterval(timer) }}
                    item={item}
                    User={user}
                    index={index}
                    onNext={onNext}
                    end={index == user ? endlistener : false}
                    onMore={onMore}
                    resetTime={resetTimeData}
                    onPrev={onPrev}
                    pressin={() => pause = true}
                    pressout={() => pause = false}
                    progress={progress}
                />}
                sliderWidth={offset}
                // autoplay
                enableSnap
                itemWidth={offset}
                firstItem={0}
                inactiveSlideScale={0.94}
                inactiveSlideOpacity={0.7}
                onSnapToItem={(index) => onChange(index)}
            />
        </View>
    </>

}

export {
    CarouselContainer
}

const styles = {
    subcont: [
        {
            flex: 1,
            margin: containerPadding,
            position: "relative"
        },
        CommonStyles.rounded
    ],
}