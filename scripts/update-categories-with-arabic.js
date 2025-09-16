const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant-db';

async function updateCategoriesWithArabic() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    const categoriesCollection = db.collection('categories');
    
    // Get all categories
    const categories = await categoriesCollection.find({}).toArray();
    console.log(`Found ${categories.length} categories to update`);
    
    // Update each category with Arabic fields
    for (const category of categories) {
      const updateData = {
        nameAr: category.nameAr || category.name, // Use existing nameAr or fallback to name
        descriptionAr: category.descriptionAr || category.description || '' // Use existing descriptionAr or fallback
      };
      
      await categoriesCollection.updateOne(
        { _id: category._id },
        { $set: updateData }
      );
      
      console.log(`Updated category: ${category.name}`);
    }
    
    console.log('All categories updated successfully!');
    
  } catch (error) {
    console.error('Error updating categories:', error);
  } finally {
    await client.close();
  }
}

// Run the update
updateCategoriesWithArabic();