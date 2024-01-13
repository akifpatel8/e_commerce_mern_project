//class to check if we have query then find it accordingly

class ApiFeatures{
    constructor(query,queryStr){
        this.query = query,
        this.queryStr = queryStr
    }
    search(){
        const key = "keyword"

        const keyword = this.queryStr[key] ? 
        {
            name:{
                $regex : this.queryStr[key],
                $options : "i"
            }
        } : {}
        this.query = this.query.find({...keyword})
        return this
    }
}

module.exports = ApiFeatures 