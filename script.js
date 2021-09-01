
// global variables
let displayCalc = '';
let currentOperator = '';
let num1 = 0;
let num2 = 0;
let floatFlag = 0;
let num1Flag = 0;
let num2Flag = 0;
let result = 0;
let equalFlag = 0;

// for displaying the previous calculation
const resultDisplay = document.querySelector('#result-display');

// functions for the operations
function add()
{  
    return num1 + num2;
}

function sub()
{  
    return num1 - num2;
}

function mul()
{  
    return num1 * num2;
}

function div()
{  
    return Math.floor(num1 / num2);
}

function operate()
{
    if( currentOperator == '+')
    {
        result = add(num1, num2);
    }
    
    else if( currentOperator == '-')
    {
        result = sub(num1, num2);
    }

    else if( currentOperator == '*')
    {
        result = mul(num1, num2);
    }

    else if( currentOperator == '/')
    {
        if(num2 == 0)
        {
            alert('Sneaky Sneaky!!!');
            return 0;
        }
        else
        {
            result = div(num1, num2);
        }
    }

    resultDisplay.textContent = `${num1} ${currentOperator} ${num2} = ${result}`;
    currentOperator = '';
}

// for evaluating the respective button
function valueCalled(e) {
    
    // code Clear the display
    if(e.target.value == 'C')
    {
        changeDisplayContent('');
        changeDisplayContent('0');
        resetFlags();
        resultDisplay.textContent = '';
        return;
    }

    // for removing the last digit
    if(e.target.value == 'D')
    {
        changeDisplayContent('D');
        return;
    }
    
    // for handling the floating points
    if(e.target.value == '.')
    {
        if(!floatFlag)
        {
            floatFlag = 1;
            changeDisplayContent('.');
            return;
        }
        else 
        {
            return;
        }
    }

    // if the operator is not '='
    if(e.target.classList.contains('operator') && e.target.value != '=')
    {

        // if the last operator was an equal sign
        if(equalFlag)
        {
            currentOperator = e.target.value;
            equalFlag = 0;
            return;
        }

        // if num1 is empty then load the entered number in num1 
        // else put the num1flag on and enter it in num2
        if(!num1Flag)
        {   
            currentOperator = e.target.value;
            if(checkFloat())
            {
                changeNum1(parseFloat(displayCalc));
            }

            else 
            {
                changeNum1(parseInt(displayCalc));
            }
            changeDisplayContent('');
        }
        
        else if(!num2Flag)
        {
            if(displayCalc == '')
            {
                currentOperator = e.target.value;
                return;
            }

            if(checkFloat())
            {
                changeNum2(parseFloat(displayCalc));
            }
            else 
            {
                changeNum2(parseInt(displayCalc));
            }
            
            // console.log('the number was saved in num2 : ' + num2);
            operate();
            changeDisplayContent('');
            changeDisplayContent('result');
            changeNum1(result);
            changeNum2(0);
            num2Flag = 0;
            currentOperator = e.target.value;
        }

        return;
    }
    
    // if the operator is '='
    else if(e.target.value == '=')
    {

        if(num1Flag && (displayCalc != '0' || displayCalc != '') && currentOperator != '')
        {
            if(checkFloat())
            {
                changeNum2(parseFloat(displayCalc));
            }
            else 
            {
                changeNum2(parseInt(displayCalc));
            }

            operate();
            changeDisplayContent('');
            changeDisplayContent('result');
            displayCalc = '0';
            changeNum1(result);
            changeNum2(0);
            num2Flag = 0;
            currentOperator = '';
            equalFlag = 1;
        }
        return;
    }
    

    // if it is a number then display it on the screen
    if(e.target.classList.contains('number'))
    {
        if(equalFlag)
        {
            changeNum1(0);
            num1Flag = 0;
            equalFlag = 0;
        }
        changeDisplayContent(e.target.value);
    }
    
}

function checkFloat()
{
    if(floatFlag)
    {
        return true;
    }
    else
    {
        return false;
    }
    
}

function changeNum1(num)
{
    num1 = num;
    num1Flag = 1;
    floatFlag = 0;
    displayCalc = '';
}

function changeNum2(num) {
    num2 = num;
    num2Flag = 1;
    floatFlag = 0;
}


function resetFlags()
{
    displayCalc = '0';
    currentOperator = '';
    num1 = 0;
    num2 = 0;
    floatFlag = 0;
    num1Flag = 0;
    num2Flag = 0;
    equalFlag = 0;
}

// for changing the display with every button pressed
function changeDisplayContent(value) {

    if(value == '')
    {
        displayCalc = '';
    }
    else if(value == 'D')
    {
        if(displayCalc.length == 1)
        {
            displayCalc = '0';
        }
        else
        {
            displayCalc = displayCalc.slice(0, -1);
        }
    }
    else if(value == 'result')
    {
        displayCalc = result;
    }
    else
    {
        if(displayCalc.length == 1 && displayCalc == '0')
        {
            displayCalc = value;
        }
        else
        {
            displayCalc += value;
        }
    }
    
    const displaySpan = document.querySelector('#displayCalc');
    displaySpan.textContent = displayCalc;
}

function calcStart()
{
    const buttons = document.querySelectorAll('.operator');
    const numbers = document.querySelectorAll('.number');
    
    numbers.forEach(number => number.addEventListener('click', valueCalled));
    buttons.forEach(button => button.addEventListener('click', valueCalled));
    
    changeDisplayContent('0');
}

// to start the whole calculator
calcStart();