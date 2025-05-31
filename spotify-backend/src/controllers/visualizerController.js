// src/controllers/visualizerController.js
import VisualizerSettings from '../models/VisualizerSettings.js';

export const getSettings = async (req, res) => {
  const userId = req.user.id;

  try {
    let settings = await VisualizerSettings.findOne({ userId });
    if (!settings) {
      settings = new VisualizerSettings({ userId });
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

export const updateSettings = async (req, res) => {
  const userId = req.user.id;
  const { theme, intensity } = req.body;

  try {
    const settings = await VisualizerSettings.findOneAndUpdate(
      { userId },
      { theme, intensity, updatedAt: Date.now() },
      { new: true, upsert: true }
    );
    res.json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};
