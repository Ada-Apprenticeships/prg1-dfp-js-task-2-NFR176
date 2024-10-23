const fs = require('fs');//fs- the library being imported//

function parseFile(indata, outdata, delimiter = ';') {// the function parsefile processes csv file//
    if (!fs.existsSync(indata)) return -1; //if loop- checks if inputfile exists, if not return -1//
    //note to self- the delimiter splits each line of the output and input content//

    if (fs.existsSync(outdata)) fs.unlinkSync(outdata);// if output data exists-it will be deleted//
    const lines = fs.readFileSync(indata, 'utf-8').split(/\n/).slice(1);
    let recordCount = 0;

    lines.forEach(line => {
        const trimmedLine = line.trim();//will read through- trim empty lines and whitespace//
        if (!trimmedLine) return;

        const [review, sentiment] = trimmedLine.split(delimiter).map(item => item.trim()); //splits content into sentiment & review//
        const shortReview = review.substring(0, 20);//taking first 20 characters of 'review' to make 'shortreview'
        fs.appendFileSync(outdata, `${sentiment}${delimiter}${shortReview}\n`, 'utf-8');//note-to-self- 'utf-8' is a form of character encoding//
        recordCount++;
    });

    return recordCount;//returns n.o processed records//
}

parseFile('./datafile.csv', './outputfile.csv');

module.exports = { parseFile };