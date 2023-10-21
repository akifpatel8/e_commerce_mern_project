// This function acts as try catch function for the passed function
// instead of writing try catch every where it is written here and
// called on other functions

module.exports = theFucnc => async(req,res,next)=>{
    // console.log("THEFUNC : ",req)
    Promise.resolve(theFucnc(req,res,next)).catch(next)
}
