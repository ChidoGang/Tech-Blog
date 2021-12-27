async function updateFormHandler(event) {
    event.preventDefault();

    const subject = document.querySelector('#subject').value.trim();
    const description = document.querySelector('#description').value.trim();
    const id = document.querySelector('#id').innerHTML;

    const response = await fetch(`/api/user/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            subject,
            description,
        }),
        headers: {'Content-Type': 'application/json'}
    });

    console.log(response)

    if (response.ok) {
        console.log('user updated');
        document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
}


document.querySelector('.update-form').addEventListener('submit', updateFormHandler);