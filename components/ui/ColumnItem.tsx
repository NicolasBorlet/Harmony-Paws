import { StyleSheet, View, ViewProps } from "react-native";

const getItemStyle = (index: number, numColumns: number) => {
  const alignItems = (() => {
    if (numColumns < 2 || index % numColumns === 0) return "flex-start";
    if ((index + 1) % numColumns === 0) return "flex-end";

    return "center";
  })();

  const paddingRight = (index + 1) % numColumns === 0 ? 0 : 8;
  const paddingLeft = index % numColumns === 0 ? 0 : 8;

  return {
    alignItems,
    width: "100%",
    paddingRight,
    paddingLeft
  } as const;
};

type ColumnItemProps = ViewProps & {
  children: React.ReactNode;
  index: number;
  numColumns: number;
};
export const ColumnItem = ({ children, index, numColumns, ...rest }: ColumnItemProps) => (
    <View style={StyleSheet.flatten([getItemStyle(index, numColumns),rest.style])} {...rest}>
      {children}
    </View>
);