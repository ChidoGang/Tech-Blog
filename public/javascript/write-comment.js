async function commentsFormHandler(event) {
    event.preventDefault();

    const comment = document.querySelector('#comment').value.trim();
    let user_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    user_id = user_id.replace('?', '')
    if(comment){
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({comment, user_id}),
            headers: { 'Content-Type': 'application/json'}
        });

        if(response.ok) {
            document.location.replace(`/profile/${user_id}`);
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.comments-form').addEventListener('submit', commentsFormHandler);