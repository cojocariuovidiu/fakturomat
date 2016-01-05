module.exports = function(err){
   var Err = function(msg){
      this.type = 'danger';
      this.message = msg;
   },
   result = [];

   if(err.errors)
      for(var error in err.errors){
         if(err.errors)
            result.push(new Err(err.errors[error].message));
      }
   else
      result.push(new Err('Unknown server error'));

   return result;
}