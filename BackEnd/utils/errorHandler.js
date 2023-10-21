// class Person{
//     constructor(firstName,lastName){
//         this.firstName=firstName,
//         this.lastName=lastName
//     }
//     getFullName(){
//         return this.firstName+" "+this.lastName
//     }
// }

// const myname=new Person("akif","patel")

// class StudentInfo extends Person{
//     constructor(firstName,lastName,studentId){
//         super(firstName,lastName)
//         this.studentId=studentId
//     }
//     getStudentDetails(){
//         return this.getFullName() +" "+this.studentId
//     }
// }
// console.log(myname.getFullName(),"1");

// const myname2=new StudentInfo("tarun","rawat","1010")
// console.log(myname2.getStudentDetails());


class ErrorHandler extends Error{  
    constructor(message,statusCode){
        super(message)   //passes message and calls the Error constructor
        this.statusCode=statusCode
        Error.captureStackTrace(this,this.constructor)
    }

}

module.exports=ErrorHandler



  