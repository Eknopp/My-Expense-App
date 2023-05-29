import { Pressable, View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getForamttedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";




function ExpenseItem({ id, description, amount, date }) {
    const navigation = useNavigation();

    function expensePressHandler() {
        navigation.navigate('ManageExpense' ,{
            expenseId: id
        });
    }

    return(
                <Pressable onPress={expensePressHandler} style={({pressed}) => pressed && styles.pressed}>
                    <View style={styles.expenseItem}>
                        <View>
                            <Text style={[styles.textBase, styles.description]}>{description}</Text>
                            <Text style={styles.textBase}>{getForamttedDate(date)}</Text>
                        </View>
                        <View style={styles.amountContainer}>
                            <Text style={styles.amount}>€{amount.toFixed(2)}</Text>
                        </View>
                    </View>
                <View style={styles.underline} />
                </Pressable>
    )
}

export default ExpenseItem;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    },
    expenseItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 6,
        marginVertical: 1,
    },
    underline:{
        height: 0.5,
        backgroundColor: '#909090',
        marginHorizontal: 15
    },
    textBase: {
        color: '#000000',
        fontFamily: 'san-francisco-regular'
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold'
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        background: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80
    },
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold',
        fontFamily: 'san-francisco-regular'
    }
})