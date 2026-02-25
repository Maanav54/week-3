let loginObject={
    email:"b16@gmail.com",
    password:"456456"
}

console.log("login data: "+JSON.stringify(loginObject))
console.log("\n\t JSON OBJECT \n")
console.log("login data: "+JSON.stringify(loginObject,null,2))

let api="http://40.0.20.123:4040/login"

async function login(){
    console.log("login function called");

    let e=document.getElementById("e").value;
    let p=document.getElementById("p").value;

    let obj={
        email:e,
        password:p,
    }

    sessionStorage.setItem("login-cred",JSON.stringify(obj));

    console.log(" data: "+JSON.stringify(obj,null,2));

    let res=await fetch(api,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj),
    })

    let data=await res.text();
    console.log(" api response : "+data);
    if(data=="Login successful"){
        alert(" Login sucess ..✅");
        window.location.href="/admin.html";

    }
}
