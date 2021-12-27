async function userFormHandler(event) {
    event.preventDefault();

    const first_name = document.querySelector('#user-firstname').value.trim();
    const last_name = document.querySelector('#user-lastname').value.trim();
    const email = document.querySelector('#user-email').value.trim();
    const password = document.querySelector('#user-password').value.trim();
    const verify = document.querySelector('#user-verify').value.trim();

    if(first_name && last_name && email && password && verify && password === verify) {
        const response = await fetch('/api/user', {
            method: 'post',
            body: JSON.stringify ({
                first_name,
                last_name,
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            document.location.replace('/login');
        }else{ 
            alert(response.statusText);
        }
    }
}
document.querySelector('.user-form').addEventListener('submit',userFormHandler);
