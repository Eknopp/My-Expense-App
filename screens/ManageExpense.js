import { useLayoutEffect, useContext, useState } from "react";
import { View, StyleSheet, Dimensions} from "react-native";

import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";


function ManageExpense({ route, navigation }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();
    const expensesCtx =  useContext(ExpensesContext)
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId);


    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing]) 

    async function deleteExpenseHandler(){
        setIsSubmitting(true);
        try {
            await deleteExpense(editedExpenseId);
            expensesCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        } catch(error) {
            setError('Failed to delete expense')
        }
        setIsSubmitting(false);
    }

    function cancelHandler(){
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        setIsSubmitting(true);
        if(isEditing) {
            try {
                await updateExpense(editedExpenseId, expenseData);
                expensesCtx.updateExpense(editedExpenseId, expenseData);
                navigation.goBack();
            } catch(error) {
                setError("Failed to update expense")
            }
            setIsSubmitting(false);
        } else {
            try{
                const id = await storeExpense(expenseData);
                expensesCtx.addExpense({...expenseData, id: id});
                navigation.goBack();
            } catch(error) {
                setError("Failed to add expense")
            }
            setIsSubmitting(false);
        }

    }

    function errorHandler() {
        setError(null);
    }

    if(error && !isSubmitting) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if(isSubmitting) {
        return <LoadingOverlay />
    }

    return (
        <View style={styles.container}>
            <ExpenseForm
              defaultValues={selectedExpense}
              onCancel={cancelHandler}
              submitButtonLabel={isEditing
              ?
              'Update'
              :
              'Add'}
              isEditing={isEditing}
              onSubmit={confirmHandler} />
          {isEditing && (
            <View style={styles.deleteContainer}>
            <IconButton
                icon="trash"
                color={GlobalStyles.colors.activeTabIcon}
                size={50}
                onPress={deleteExpenseHandler} />
            </View>
            )}    
        </View>
    )
}

export default ManageExpense;

const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor:GlobalStyles.colors.primary800,
    },
    deleteContainer: {
        flex: deviceHeight < 650 ? 0 : 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
    
})