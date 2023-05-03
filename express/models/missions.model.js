module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      title: String,
      description: String,
    },
    { timestamps: false }
  );
  const Mission = mongoose.model("mission", schema);
  return Mission;
};
