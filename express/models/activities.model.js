module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      title: String,
      description: String,
    },
    { timestamps: false }
  );
  const Activity = mongoose.model("activity", schema);
  return Activity;
};
