import mongoose from 'mongoose'

const milestoneSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

const aboutSchema = new mongoose.Schema({
  journey: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  milestones: [milestoneSchema]
}, {
  timestamps: true
})

const About = mongoose.models.About || mongoose.model('About', aboutSchema)

export default About 