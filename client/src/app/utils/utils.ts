export const handleError = (error: Error) => {
    let errorMessage: string = `${error.name}: ${error.message}`;
    console.log(errorMessage);
    let cStat = error.message.split(/:/)[1].trim();
    switch(cStat){
      case 'TokenExpiredError': {
        this.router.navigate(['/']);
        break
      }
    }    
    return Promise.reject(new Error(errorMessage));
}