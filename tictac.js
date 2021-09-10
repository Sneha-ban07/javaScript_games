let count = 0;
let list = Array(10).fill(0);
let t=1000;
let win =0;
function restart()
{
    location.reload();
}

let condition = 
[   [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]   ]

function addValue(n)
{
    if(count==0)
    {
        document.getElementsByTagName('h3')[0].style.visibility = 'hidden';
    }
    let s = 'b';
    s = s+ String(n);
    if(list[n]==0)
    {
        document.getElementById(s).innerText = 'X';
        count+=1;
        list[n] = 'X';
        if (count==1)
            computer(n);
        if(count>=5)
            checkWin('X');
        if(!checkWin('X'))
        {   
            if (count>2 && count<9)
                if(!searchTwoZero())
                    if(!searchTwo(n,'X'))
                        computerNext();
        }
    }
    else{
        alert("position is already filled");
    }
    if(count==9)
    {
        console.log('draw');
        setTimeout(function()
        {   
            document.getElementById('main').style.display = 'none';
            document.getElementById('result').style.display = 'block';
            document.getElementById('data').innerHTML = '<h1>Its a Draw</h1>';
        }, 1250);
    }
}

function computer(n)
{
    if (count==1)
    {   let s2; 
        if(n!=5)
        {
            s2 = 'b5';
        }
        else
        {
            let arr = new Array;
            for(let i=1;i<=9;i++)
            {
                if (i==5 || i==n)
                    continue;
                arr.push(i);
            }
            let j = arr[Math.floor(Math.random()*arr.length)];

            s2= 'b'+String(j);
        }
        let doc = document.getElementById(s2);
        setTimeout(function(){
            doc.innerText = 'O';
        },t);
        count+=1;
        list[Number(s2[1])]='O';
    } 
}

function computerNext()
{
    if(win==0)
    {
        let remaining = [];
        for(let i=1;i<=9;i++)
        {
            if(list[i]==0)
                remaining.push(i)
        }
        let j2 = remaining[Math.floor(Math.random()*remaining.length)];
        j2 = 'b'+String(j2);
        console.log(j2);
        let doc = document.getElementById(j2);
        setTimeout(function(){
            doc.innerText = 'O';
        },t);
        count+=1;
        list[Number(j2[1])]='O';
    }
}

function checkWin(str)
{
    let flag=0;
    let val=[];
    for(let i=0;i<condition.length;i++)
    {
        val = condition[i];
        if(list[val[0]]==str && list[val[1]]==str && list[val[2]]==str)
        {   flag =1;
            condition.splice(i,1);
            break;
        }

    }
    if (flag==1)
    {
        setTimeout(function()
        {
            document.getElementById('b'+String(val[0])).style.color = 'red';
            document.getElementById('b'+String(val[1])).style.color = 'red';
            document.getElementById('b'+String(val[2])).style.color = 'red';
        },t);
        if (str=='X')
        {
            console.log("Win");
            t=4000;
            win =1;
            setTimeout(function()
            {
                document.getElementById('main').style.display = 'none';
                document.getElementById('result').style.display = 'block';
                document.getElementById('data').innerHTML = '<h1>You Won!!!</h1>';
            }, 2000);
        }
        else if (str=='O')
        {
            console.log('lose');
            console.log("Win");
            setTimeout(function()
            {   
                document.getElementById('main').style.display = 'none';
                document.getElementById('result').style.display = 'block';
                document.getElementById('data').innerHTML = '<h1>You lost</h1>';
            }, 2000);
        }
        return 1;
    }
    return 0;
}

function searchTwo(num, str)
{
    let flag=0;
    if(win==0)
        for(let i=0;i<condition.length;i++)
        {
            if(condition[i].includes(num))
            {
                let val = condition[i];
                let index = val.indexOf(num);
                if(index==0)
                {
                    if(list[val[1]]==str && list[val[2]]!='O')
                    {
                        setTimeout(function()
                        {
                            document.getElementById('b'+String(val[2])).innerText = 'O';
                        },t);
                        flag=1;
                        list[val[2]]='O';
                        condition.splice(i, 1)
                        break;
                    }
                    if(list[val[2]]==str && list[val[1]]!='O')
                    {
                        setTimeout(function()
                        {
                            document.getElementById('b'+String(val[1])).innerText = 'O';
                        },t);
                        flag=1;
                        list[val[1]]='O';
                        condition.splice(i, 1);
                        break;
                    }
                }
                else if(index==1)
                {
                    if(list[val[0]]==str && list[val[2]]!='O')
                    {
                        setTimeout(function()
                        {
                            document.getElementById('b'+String(val[2])).innerText = 'O';
                        },t);
                        flag=1;
                        list[val[2]]='O';
                        condition.splice(i, 1);
                        break;
                    }
                    else if(list[val[2]]==str && list[val[0]]!='O')
                    {
                        setTimeout(function()
                        {
                            document.getElementById('b'+String(val[0])).innerText = 'O';
                        },t);
                        flag=1;
                        list[val[0]]='O';
                        condition.splice(i, 1);
                        break;
                    }
                }
                else if(index==2)
                {
                    if(list[val[1]]==str && list[val[0]]!='O')
                    {
                        setTimeout(function()
                        {
                            document.getElementById('b'+String(val[0])).innerText = 'O';
                        },t);
                        list[val[0]]='O';
                        flag=1
                        condition.splice(i, 1);
                        break;
                    }
                    else if(list[val[0]]==str && list[val[1]]!='O')
                    {
                        setTimeout(function()
                        {
                            document.getElementById('b'+String(val[1])).innerText = 'O';
                        },t);
                        flag=1;
                        list[val[1]]='O';
                        condition.splice(i, 1);
                        break;
                    }
                }
            }
        }
    checkWin('O');
    if(flag==1)
    {   count+=1;
        return 1;
    }
    return 0;
}

function searchTwoZero()
{
    let flag=0;
    if(win==0)
        for(let i=0;i<condition.length;i++)
        {
            let val = condition[i];
            if(list[val[0]]=='O' && list[val[1]]=='O' && list[val[2]]!='X')
            {
                setTimeout(function()
                {
                    document.getElementById('b'+String(val[2])).innerText = 'O';
                },t);
                flag=1;
                list[val[2]]='O';
                break;
            }
            else if(list[val[1]]=='O' && list[val[2]]=='O' && list[val[0]]!='X')
            {
                setTimeout(function()
                {
                    document.getElementById('b'+String(val[0])).innerText = 'O';
                },t);
                flag=1;
                list[val[0]]='O';
                break;
            }
            else if(list[val[0]]=='O' && list[val[2]]=='O' && list[val[1]]!='X')
            {
                setTimeout(function()
                {
                    document.getElementById('b'+String(val[1])).innerText = 'O';
                },t);
                flag=1;
                list[val[1]]='O';
                break;
            }      
        }
    checkWin('O');
    if(flag==1)
    {   
        count+=1;
        return 1;
    }
    return 0;
}