import mongoose, { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this.query.search as string | undefined;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: search, $options: 'i' },
        })),
      } as FilterQuery<T>);
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = [
      'search',
      'sortBy',
      'sortOrder',
      'limit',
      'page',
      'fields',
    ];
    excludeFields.forEach((field) => delete queryObj[field]);

    if (queryObj.filter) {
      queryObj.author = new mongoose.Types.ObjectId(queryObj.filter as string);
      delete queryObj.filter;
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  sort() {
    const sortBy = this.query.sortBy as string | undefined;
    const sortOrder = this.query.sortOrder === 'desc' ? -1 : 1;
    if (sortBy) {
      this.modelQuery = this.modelQuery.sort({
        [sortBy]: sortOrder,
      } as FilterQuery<T>);
    }
    return this;
  }
}

export default QueryBuilder;
