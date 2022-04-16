const getNumberOfLargerValuesThanLast = (collection: number[]): number =>
  collection.filter((value, index, array) => array.at(index - 1) < value).length;

export default getNumberOfLargerValuesThanLast;
