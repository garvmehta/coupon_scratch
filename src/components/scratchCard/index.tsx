import { useMemo, useRef, useState } from 'react'
import { Animated, Dimensions, Easing, Image, ImageBackground, ImageSourcePropType, ImageStyle, StyleSheet, View, ViewStyle } from 'react-native'
import { ScratchCard } from 'rn-scratch-card'
interface ScratchingCardPropType {
    width: number,
    height: number,
    backgroundImage: ImageSourcePropType,
    foregroundImage: ImageSourcePropType,
    containerStyle?: ViewStyle,
    borderRadius?: number

}
const ScratchingCard = (props: ScratchingCardPropType) => {
    const { borderRadius = 20, backgroundImage, foregroundImage } = props
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const scale = useRef(new Animated.Value(1)).current;
    // @ts-ignore
    const cardRef = useRef<Animated.View>(null);
    const sizeStyle: ViewStyle = useMemo(() => {
        return {
            width: props.width,
            height: props.height,
            ...props.containerStyle
        }
    }, [props.height, props.width, props.containerStyle])
    
    const bgSize: ViewStyle = useMemo(() => {
        return {
            width: props.width * 0.75,
            height: props.height * 0.75,
        }
    }, [props.height, props.width, props.containerStyle])

    const bounce = () => {
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true,

            }),
            Animated.timing(scale, {
                toValue: 1.4,
                duration: 1000,
                useNativeDriver: true,

            })
        ]).start(() => {
            cardRef.current.setNativeProps({ style: { display: 'none' } });
            console.log('Done...')
        });

    };
    function handleScratch(scratchPercentage: number) {
        console.log(scratchPercentage)
        if (scratchPercentage >= 40) {
            bounce();
        }
    }
    return (
        <View style={[sizeStyle, { alignItems: 'center', justifyContent: 'center' }]}>
            <Image
                source={require('./assets/bg.png')}
                style={[styles.img, sizeStyle as ImageStyle]}
            />
            <View style={[bgSize,]}>
                <Animated.View style={[styles.background_view, bgSize as ImageStyle, { borderRadius: borderRadius, transform: [{ scale: scale }] }]}>
                    <Image source={backgroundImage} style={ [styles.cardImg, {borderRadius: borderRadius},]} />
                </Animated.View>
                <Animated.View style={{ opacity: fadeAnim }} ref={cardRef} >
                    <ScratchCard
                        source={foregroundImage}
                        brushWidth={50}
                        onScratch={handleScratch}
                        style={{ ...styles.scratch_card, ...bgSize, borderRadius }}
                    />
                </Animated.View>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    
    img: {
        position: 'absolute',
        left: 0,
        top: 0,
    },
    background_view: {
        position: 'absolute',
        backgroundColor: 'transparent',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    scratch_card_container: {
        backgroundColor: 'transparent',
        overflow: 'hidden'
    },
    scratch_card: {
        backgroundColor: 'transparent',
        overflow: 'hidden'
    },
    cardImg: {
        width: '100%',
        height: '100%',
    }
})

export default ScratchingCard;