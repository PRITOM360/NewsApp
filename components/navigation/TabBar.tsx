import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Animated as RNAnimated } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from '@/context/ThemeContext';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { theme } = useTheme();

  return (
    <View 
      style={[
        styles.container, 
        { 
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
        }
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        
        const tabColor = isFocused ? theme.colors.primary : theme.colors.textSecondary;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            {options.tabBarIcon ? 
              options.tabBarIcon({ color: tabColor, size: 24, focused: isFocused }) : null}
            
            <Text style={[
              styles.tabLabel, 
              { 
                color: tabColor,
                fontFamily: isFocused ? 'Inter-Medium' : 'Inter-Regular',
              }
            ]}>
              {label.toString()}
            </Text>
            
            {isFocused && (
              <Animated.View 
                style={[
                  styles.indicator, 
                  { backgroundColor: theme.colors.primary }
                ]} 
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    height: 3,
    width: '50%',
    borderRadius: 1.5,
  }
});

export default TabBar;