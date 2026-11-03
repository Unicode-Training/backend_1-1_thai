// const getPosts = async () => {
//     const response = await fetch(`http://localhost:3000/api/posts`, {
//         method: 'PUT',
//         headers: {
//             "x-api-key": "123"
//         },
//         credentials: "include"
//     });
//     const data = await response.json();
//     console.log(data);
// }
// getPosts();

const forgotPassword = async () => {
    const response = await fetch(`https://instagram.f8team.dev/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": "hoangan.web@gmail.com"
        })
    });
    const data = await response.json();
    console.log(data);

}
forgotPassword();