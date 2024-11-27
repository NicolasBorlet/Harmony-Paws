import { View, StyleSheet } from "react-native"
import { BodyBold } from "../ui/text"


export default function BodyTitle({ title }: { title: string }) {
    return (
        <View style={styles.section}>
            <BodyBold color='#000000'>{title}</BodyBold>
            <View style={styles.underline} />
        </View>
    )
}

const styles = StyleSheet.create({
    underline: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 10,
        backgroundColor: 'rgba(238, 116, 170, 0.3)',
        bottom: 0,
    },
    section: {
        alignSelf: 'flex-start',
        position: 'relative',
    },
})