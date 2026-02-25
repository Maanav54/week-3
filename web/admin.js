window.onload = function () {
    let user = sessionStorage.getItem("user");

    if (user) {
        let userObj = JSON.parse(user);
        console.log("User loaded from sessionStorage:", userObj);

        // example usage
        document.getElementById("username").innerText = userObj.name;
        document.getElementById("email").innerText = userObj.email;
    } else {
        alert("No session found ❌ Redirecting to signup");

        // safety redirect
        window.location.href = "/signup";
    }
};
