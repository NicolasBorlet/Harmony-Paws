import OpacityFadeIn from "@/components/animate/opacity-fadeIn";
import Back from "@/components/back-button";
import MessageItemListing from "@/components/messageListing/message-item-listing";
import RoundedIconLink from "@/components/rounded-icon-link";
import { NavigationTitle } from "@/components/ui/text";
import { AntDesign } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Pressable, TextInput, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

const messagesData = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://picsum.photos/300',
    message: 'Hello, how are you?',
    date: new Date().getTime() + 1000000
  },
  {
    id: 2,
    name: 'Jane Doe',
    avatar: 'https://picsum.photos/300',
    message: 'Hello, how are you?',
    date: new Date().getTime() - 20000
  },
  {
    id: 3,
    name: 'John Doe',
    avatar: 'https://picsum.photos/300',
    message: 'Hello, how are you?',
    date: new Date().getTime() - 30000
  },
  {
    id: 4,
    name: 'John Doe',
    avatar: 'https://picsum.photos/300',
    message: 'Hello, how are you?',
    date: new Date().getTime() - 40000
  },
  {
    id: 5,
    name: 'John Doe',
    avatar: 'https://picsum.photos/300',
    message: 'Hello, how are you?',
    date: new Date().getTime() - 50000
  },
  {
    id: 6,
    name: 'John Doe',
    avatar: 'https://picsum.photos/300',
    message: 'Hello, how are you?',
    date: new Date().getTime() - 60000
  },
  {
    id: 7,
    name: 'John Doe',
    avatar: 'https://picsum.photos/300',
    message: 'Hello, how are you?',
    date: new Date().getTime() - 70000
  },
  {
    id: 8,
    name: 'John Doe',
    avatar: 'https://picsum.photos/300',
    message: 'Hello, how are you?',
    date: new Date().getTime() - 80000
  },
  {
    id: 9,
    name: 'John Doe',
    avatar: 'https://picsum.photos/300',
    message: 'Hello, how are you?',
    date: new Date().getTime() - 90000
  },
  {
    id: 10,
    name: 'John Doe',
    avatar: 'https://picsum.photos/300',
    message: 'Hello, how are you?',
    date: new Date().getTime() - 100000
  }
]

export default function Messages() {
  const searchHeight = useSharedValue(50); // Hauteur initiale
  const searchOpacity = useSharedValue(1); // Opacité initiale

  // Handler pour capturer le défilement
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const scrollY = event.contentOffset.y;
      if (scrollY > 10) {
        // Réduire la hauteur et l'opacité
        searchHeight.value = withTiming(0, { duration: 300 });
        searchOpacity.value = withTiming(0, { duration: 300 });
      } else {
        // Restaurer la hauteur et l'opacité
        searchHeight.value = withTiming(50, { duration: 300 });
        searchOpacity.value = withTiming(1, { duration: 300 });
      }
    },
  });

  // Style animé pour la barre de recherche
  const animatedStyle = useAnimatedStyle(() => ({
    height: searchHeight.value,
    opacity: searchOpacity.value, // Ajoute l'opacité
    overflow: "hidden", // Assure que le contenu est masqué
  }));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Back position="relative" left="0" />
            <NavigationTitle color="#000">Messages</NavigationTitle>
          </View>
          <RoundedIconLink icon={<AntDesign name="plus" size={20} color="white" />} href="/messages" />
        </View>
        <Animated.View style={[animatedStyle]}>
          <TextInput
            placeholder="Search"
            style={{
              flex: 1,
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 30,
              borderWidth: 1,
              borderColor: "#B9B9B9",
              color: "#696969",
            }}
          />
        </Animated.View>
      </View>
      <AnimatedFlashList
        data={messagesData}
        renderItem={({ item, index }) => (
          <Pressable onPress={() => {}}>
            <OpacityFadeIn delay={index * 200}>
              <MessageItemListing messageData={item} />
            </OpacityFadeIn>
          </Pressable>
        )}
        estimatedItemSize={10}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: "#C5C3C3",
              width: "100%",
              marginVertical: 20,
            }}
          />
        )}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 80,
          paddingTop: 24,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler} // Connecte le gestionnaire
        scrollEventThrottle={16} // Assure une fluidité
      />
    </SafeAreaView>
  );
}
