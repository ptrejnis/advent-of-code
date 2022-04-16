let largerMeasurments = [];
function getNumberOfLargerValuesThanLast(collection: number[]): number {
  for (const [index, item] of collection.entries()) {
    if (item > collection.at(index - 1)) {
      largerMeasurments.push(item);
    }
  }

  return largerMeasurments.length;
}

export default getNumberOfLargerValuesThanLast;
