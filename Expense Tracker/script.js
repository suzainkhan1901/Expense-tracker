const transactions = [];
const totalIncomeElem = document.getElementById('total-income');
const totalExpensesElem = document.getElementById('total-expenses');
const netIncomeElem = document.getElementById('net-income');
const transactionsElem = document.getElementById('transactions');

document.getElementById('add-transaction').addEventListener('click', function() {
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    if (!description || !date || isNaN(amount) || amount <= 0) {
        alert('Please enter valid transaction details.');
        return;
    }

    const transaction = { description, date, amount, category };
    transactions.push(transaction);
    updateTransactionList();
    updateSummary();
    clearFields();
});

function updateTransactionList() {
    transactionsElem.innerHTML = '';

    transactions.forEach((transaction, index) => {
        const li = document.createElement('li');
        li.textContent = `${transaction.date} - ${transaction.description} - $${transaction.amount} (${transaction.category})`;
        li.appendChild(createDeleteButton(index));
        transactionsElem.appendChild(li);
    });
}

function createDeleteButton(index) {
    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.style.marginLeft = '10px';
    button.addEventListener('click', () => {
        transactions.splice(index, 1);
        updateTransactionList();
        updateSummary();
    });
    return button;
}

function updateSummary() {
    const totalIncome = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0);
    
    totalIncomeElem.textContent = totalIncome.toFixed(2);
    totalExpensesElem.textContent = Math.abs(totalExpenses).toFixed(2);
    netIncomeElem.textContent = (totalIncome + totalExpenses).toFixed(2);
}

function clearFields() {
    document.getElementById('description').value = '';
    document.getElementById('date').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('category').value = 'Food';
}