function setName()
{
    let userName;
    while(!userName)
    {
        userName = prompt('Please Input Your Name(^v^):');
        localStorage.setItem('name', userName);
    }
    alert('hello\\@^0^@)/,' + userName);
}
