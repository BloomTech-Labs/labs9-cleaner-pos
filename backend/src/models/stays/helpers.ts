import { findListsStay } from '../lists';

const errorHandler = (e: Error) => {
  console.error(e);
};

type ListType = 'before' | 'during' | 'after';

export async function getPreparationProgress(
  listType: ListType,
  houseId: number,
  stayId: number,
) {
  const result: any = await findListsStay(houseId, stayId).catch(errorHandler);

  const list = result[listType];

  let numberOfCompleted = 0;
  const numberOfItems = list.length;

  for (const item of list) {
    numberOfCompleted += Number(item.complete);
  }

  return (numberOfCompleted / numberOfItems) * 100;
}
