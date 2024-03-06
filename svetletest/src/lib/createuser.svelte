<script>
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import { app } from '../firebase'

    let email = ""
    let password = ""

    function createUser(e){
        e.preventDefault();
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(userCredential)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage)
        });

        // import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

        // const auth = getAuth(app);
        // signInWithEmailAndPassword(auth, email, password)
        // .then((userCredential) => {
        //     // Signed in 
        //     const user = userCredential.user;
        //     // ...
        // })
        // .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        // });
    }
    
</script>

<div>
    <form on:submit={createUser}>
        <input autocomplete="username" required={true} type="email" bind:value={email}/>
        <input autocomplete="current-password" required={true} type="password" bind:value={password}/>
        <button type="submit">Submit</button>
    </form>
</div>