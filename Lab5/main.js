const asyncAdd = async (a, b) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(a + b);
      }, 100);
    });
  };
  
  const parallelSum = async (numbers) => {
    let result = numbers;
    
    while (result.length > 1) {
      let tempResult = [];
      for (let i = 0; i < result.length; i += 2) {
        if (i + 1 < result.length) {
          tempResult.push(asyncAdd(result[i], result[i + 1]));
        } else {
          tempResult.push(result[i]);
        }
      }
      result = await Promise.all(tempResult);
    }
    
    return result[0];
  };
  
  (async () => {
    let numbers = [];
    for (let i = 0; i < 100; i++) {
        numbers.push(Math.random());
    }
    
    const start = performance.now();
    try {
      const sum = await parallelSum(numbers);
      const end = performance.now();
      
      console.log('Wynik dodawania liczb:', sum);
      console.log(`Czas wykonania: ${end - start} ms`);
    } catch (error) {
      console.log('Błąd:', error);
    }
  })();
  