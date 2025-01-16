//Strategy Interface
abstract class SortStrategy {
  abstract sort(array: number[]): void;
}

// Factory Class
class SortStrategyFactory {
  static createSorterStrategy(type: string): SortStrategy {
    switch (type) {
      case "bubble":
        return new BubbleSorterStrategy();
      case "merge":
        return new MergeSorterStrategy();
      case "quick":
        return new QuickSorterStrategy();
      default:
        throw new Error("Unknown sorting strategy type");
    }
  }

  static createSortingStrategyWithGeneric<T extends SortStrategy>(
    ctr: new () => T
  ): T {
    return new ctr();
  }
}

//Concrete Strategies
//These can also be extended from a base class if they share common behavior
class BubbleSorterStrategy extends SortStrategy {
  sort(array: number[]): void {
    // Implement Bubble Sort algorithm
    console.log("Sorting using Bubble Sort");
  }
}

class MergeSorterStrategy extends SortStrategy {
  sort(array: number[]): void {
    // Implement Merge Sort algorithm
    console.log("Sorting using Merge Sort");
  }
}

class QuickSorterStrategy extends SortStrategy {
  sort(array: number[]): void {
    // Implement Quick Sort algorithm
    console.log("Sorting using Quick Sort");
  }
}

/*In this example, the Context is not needed*/

//Client
function mainStrategy2() {
  // Output: Sorting using Bubble Sort
  SortStrategyFactory.createSorterStrategy("bubble").sort([5, 2, 9, 1, 5]);

  // Output: Sorting using Merge Sort
  SortStrategyFactory.createSorterStrategy("merge").sort([8, 3, 7, 4, 2]);

  // Output: Sorting using Merge Sort*/
  SortStrategyFactory.createSorterStrategy("quick").sort([6, 1, 3, 9, 5]);

  // Output: Sorting using Bubble Sort
  SortStrategyFactory.createSortingStrategyWithGeneric(
    BubbleSorterStrategy
  ).sort([5, 2, 9, 1, 5]);
}

mainStrategy2();
