async function userFormHandler(event) {
    event.preventDefault();
    const email = document.querySelector('#user-email').value.trim();
    const password =document.querySelector('#user-password').value.trim();

    if (email && password) {
        const response = await fetch('/api/user/login',{
            method:'post',
            body:JSON.stringify({
                email,
                password
            }),
            headers:{'Content-Type': 'application/json'}
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
   
}

document.querySelector('.user-form').addEventListener('submit',userFormHandler)