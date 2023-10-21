// const fun =()=>{
//         let a 
//         a=a+b
// }

// const commonTryCatch=(x)=>{
//     Promise.resolve(x()).catch((err)=>{
//         console.log("its error",err);
//     })
// }


// console.log(commonTryCatch(fun));


function x(a,b,next){
    console.log("x")
    function y(){
        console.log("y")
        function z(){
            console.log("z")
        }
        console.log("before next")
        next()
        console.log("after next")
    }
    y()
}

function t (){
    console.log("t")
}

function a(req,res){
    console.log("before next in a")
    console.log("after next in a")
    x()
}

a()