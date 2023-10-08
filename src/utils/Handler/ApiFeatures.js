export default class ApiFeature {
  constructor(model, query) {
    this.model = model.find();
    this.query = query;
  }

  pagination() {
    let limit = this.query.limit * 1 || 50;
    if (limit > 50 || limit < 0) limit = 50;
    let page = this.query.page * 1 || 1;
    if (this.query.page < 0) page = 1;
    this.page = page;
    this.limit = limit;
    let skip = (page - 1) * limit;
    this.model.skip(skip).limit(limit);
    return this;
  }

  filter() {
    let excludedQuery = ["page", "limit", "keyword", "sort", "fields"];
    let filterObj = { ...this.query };
    excludedQuery.forEach((element) => {
      delete filterObj[element];
    });
    filterObj = JSON.parse(
      JSON.stringify(filterObj).replace(
        /\bgt|gte|lt|lte\b/gi,
        (matched) => `$${matched}`
      )
    );
    this.model.find(filterObj);
    return this;
  }

  search() {
    if (this.query.keyword) {
      this.model.find({
        $or: [
          { name: { $regex: this.query.keyword, $options: "i" } },
          { title: { $regex: this.query.keyword, $options: "i" } },
          { description: { $regex: this.query.keyword, $options: "i" } },
        ],
      });
    }
    return this;
  }

  fields() {
    if (this.query.fields) {
      let selected = this.query.fields.split(",").join(" ");
      this.model.select(selected);
    }
    return this;
  }

  sort() {
    if (this.query.sort) {
      let sorted = this.query.sort.split(",").join(" ");
      this.model.sort(sorted);
    }
    return this;
  }
}
