
const fs = require('fs');

//this will delete the output file//
function parseFile (indata, outdata, delimiter = ';') {
   if (!fs.existsSync(indata)) {
    return -1;
   }
   if (fs.existsSync(outdata)) {
      fs.unlinkSync(outdata);
    
    }
      let recordcount = 0;
      try {
         const fileContent = fs.readFileSync(indata, 'utf-8');
          //utf-8 a way of representing a language//
         const lines = fileContent.split(/\n/);

         for (let i = 1; i < lines.length; i++) {
            const line =lines[i].trim();
            if(line === '') continue;

            const [review, sentiment] = line.split(delimiter).map(item=> item.trim());
            const shortReview = review.substring(0, 20);
            console.log(shortReview)

            fs.appendFileSync (outdata, `${sentiment}${delimiter}${shortReview}\n`, 'utf-8');
            recordcount ++;
         }
      }
      catch (err) {
      console.error('Error parsing file:', err);
      return -1;
   }
    return recordcount;
}
parseFile('./datafile.csv','./outputfile.csv')


module.exports ={
   parseFile,
}
