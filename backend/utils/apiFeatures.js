class ApiFeatures{
    constructor(query, queryStr){
        this.query= query;
        this.queryStr=queryStr;
    }
    search (){
        let keyword = this.queryStr.keyword ?{
            name: {
              $regex: this.queryStr.keyword,
              $options: 'i'
            }

        }: {};
        this.query.find({...keyword})
        return this;
    }
    filter(){
        const queryStrCopy={...this.queryStr};

        //before
        console.log(queryStrCopy);
        //removing fields from query
        const removeFields=['keyword','limit', 'page'];
        removeFields.forEach(field=> delete queryStrCopy[field]);

        //after removing
        console.log(queryStrCopy)

    }
}

module.exports= ApiFeatures;