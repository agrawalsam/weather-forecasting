var asyncAdd = (a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(typeof a==="number" && typeof b==="number"){
                resolve(a+b);
            }
            else{
                reject("Different Arguments found");
            }
        },2500);
        
    })
};

asyncAdd(5,7).then((res)=>{
    console.log(res);
    return asyncAdd(res,"a");
},(errorMessage)=>{
    console.log(errorMessage);
}).then((res)=>{
    console.log(res);
},(errorMessage)=>{
    console.log(errorMessage);
})