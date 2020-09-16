function Dictionary(words) {
    this.words = words;
  }
  //ф-я Левенштейна для вычисления минимального редакционного числа
  let levenstein = function(A, B) {
    let F = [];  
    for (let i = 0; i < A.length + 1; i++) {
      F.push([]);
      for (let j = 0; j < B.length + 1; j++) {
        F[i].push( i*j ? 0: i+j )
      }
    }
    for (let i = 1; i < A.length + 1; i++) {
      for (let j = 1; j < B.length + 1; j++) {
          if(A[i-1] === B[j-1]) F[i][j] = F[i-1][j-1]
          else F[i][j] = 1 + Math.min(F[i-1][j], F[i][j-1], F[i-1][j-1])
      }
    }    
    return F[A.length][B.length];
  }
  
  Dictionary.prototype.findMostSimilar = function(term) {
    let similar = this.words.reduce((similar, word, index, arr) => {
      let F = levenstein(term, word);
      return F < similar.minF ? {minF: F, word} : similar;
    }, {minF:1000, word:''});
    console.log(similar);
    return similar.word;
  }
  
  fruits = new Dictionary(['cherry', 'pineapple', 'melon', 'strawberry', 'raspberry']);
  fruits.findMostSimilar('strawbery'); // must return "strawberry"
  fruits.findMostSimilar('berry'); // must return "cherry"
  
  things = new Dictionary(['stars', 'mars', 'wars', 'codec', 'codewars']);
  things.findMostSimilar('coddwars'); // must return "codewars"
  
  languages = new Dictionary(['javascript', 'java', 'ruby', 'php', 'python', 'coffeescript']);
  languages.findMostSimilar('heaven'); // must return "java"
  languages.findMostSimilar('javascript'); // must return "javascript" (same words are obviously the most similar ones)