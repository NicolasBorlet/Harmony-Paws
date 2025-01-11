import { AntDesign } from "@expo/vector-icons";
import React, { useCallback, useRef, useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

type OptionItem = {
  value: string;
  label: string;
};

interface DropDownProps {
  data: OptionItem[];
  onChange: (item: OptionItem) => void;
  placeholder: string;
}

export default function Dropdown({
  data,
  onChange,
  placeholder,
}: DropDownProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);

  const [value, setValue] = useState("");

  const buttonRef = useRef<View>(null);

  const [top, setTop] = useState(0);

  const onSelect = useCallback((item: OptionItem) => {
    onChange(item);
    setValue(item.label);
    setExpanded(false);
  }, []);
  return (
    <View
      ref={buttonRef}
      onLayout={(event) => {
        const layout = event.nativeEvent.layout;
        const heightOfComponent = layout.height;

        setTop(heightOfComponent);
      }}
    >
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={toggleExpanded}
      >
        <Text style={styles.text}>{value || placeholder}</Text>
        <AntDesign name={expanded ? "up" : "down"} color="#F7A400" size={16} />
      </TouchableOpacity>
      {expanded ? (
        <Modal visible={expanded} transparent>
          <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
            <View style={styles.backdrop}>
              <View
                style={[
                  styles.options,
                  {
                    marginTop: top,
                  },
                ]}
              >
                <FlatList
                  keyExtractor={(item) => item.value}
                  data={data}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.optionItem}
                      onPress={() => onSelect(item)}
                    >
                      <Text style={styles.label}>{item.label}</Text>
                      {value === item.label && (
                        <AntDesign name="check" color="#F7A400" size={16} style={styles.checkIcon} />
                      )}
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  optionItem: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  separator: {
    height: 4,
  },
  options: {
    position: "absolute",
    // top: 53,
    backgroundColor: "#F5F5F5",
    width: "100%",
    padding: 10,
    borderRadius: 6,
    maxHeight: 250,
  },
  text: {
    fontSize: 16,
    opacity: 0.8,
    fontFamily: "Montserrat_500Medium",
  },
  label: {
    fontSize: 14,
    opacity: 0.8,
    fontFamily: "Montserrat_400Regular",
  },
  button: {
    height: 50,
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  checkIcon: {
    marginRight: 10,
  },
});