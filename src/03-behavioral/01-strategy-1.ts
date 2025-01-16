/*
The Strategy Design Pattern is a behavioral design pattern that allows you
to define a family of algorithms or behaviors, put each of them in a
separate class, and make them interchangeable at runtime. This pattern is
useful when you want to dynamically change the behavior of a class without
modifying its code.
*/

//Strategy Interface
interface SortingStrategy {
  sort(array: number[]): void;
}

//Concrete Strategies
//These can also be extended from a base class if they share common behavior
class BubbleSortStrategy implements SortingStrategy {
  sort(array: number[]): void {
    // Implement Bubble Sort algorithm
    console.log("Sorting using Bubble Sort");
  }
}

class MergeSortStrategy implements SortingStrategy {
  sort(array: number[]): void {
    // Implement Merge Sort algorithm
    console.log("Sorting using Merge Sort");
  }
}

class QuickSortStrategy implements SortingStrategy {
  sort(array: number[]): void {
    // Implement Quick Sort algorithm
    console.log("Sorting using Quick Sort");
  }
}

//Context
//This assignes the task to a strategy object
//It serves as an intermediary between the client and the strategy
class SortingContext {
  private sortingStrategy: SortingStrategy;

  constructor(strategy: SortingStrategy) {
    this.sortingStrategy = strategy;
  }

  setSortingStrategy(strategy: SortingStrategy) {
    this.sortingStrategy = strategy;
  }

  performSort(arr: number[]) {
    return this.sortingStrategy.sort(arr);
  }
}

//Client
function mainStrategy1() {

  const sortingContext = new SortingContext(new BubbleSortStrategy());
  const array1 = [5, 2, 9, 1, 5];
  sortingContext.performSort(array1); // Output: Sorting using Bubble Sort

  // Change strategy to MergeSortStrategy
  sortingContext.setSortingStrategy(new MergeSortStrategy());
  const array2 = [8, 3, 7, 4, 2];
  sortingContext.performSort(array2); // Output: Sorting using Merge Sort

  // Change strategy to QuickSortStrategy
  sortingContext.setSortingStrategy(new QuickSortStrategy());
  const array3 = [6, 1, 3, 9, 5];
  sortingContext.performSort(array3); // Output: Sorting using Merge Sort
}
mainStrategy1();
